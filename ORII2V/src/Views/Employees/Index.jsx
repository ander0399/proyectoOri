// eslint-disable-next-line no-unused-vars
import React,{useEffect,useState,useRef} from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import DivSelect from '../../Components/DivSelect';
import DivInput from '../../Components/DivInput';
import Modal from '../../Components/Modal';
import{confirmation,sendRequest} from '../../functions';
import { PaginationControl } from 'react-bootstrap-pagination-control';


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [id, setId]=useState('');
  const [name, setName]=useState('');
  const [Email, setEmail]=useState('');
  const [phone, setphone]=useState('');
  const [operation, setOperation]=useState('');
  const [title, setTitle]=useState('');
  const [departamentId, setDepartamentId]=useState('');
  const [departaments, setDepartaments]=useState([]);
  const [classLoad, setClasLoad]=useState('');
  const [classTable, setClasTable]=useState('d-none');
  const [rows, setRow]=useState(0);
  const [page, setPage]=useState(1);
  const [pageSize, setPageSize]=useState(0);
  const NameInput= useRef();
  const close=useRef();
  let method = '';
  let url='';
  
  useEffect(()=>{
   getEmployees(1);
   getDepartaments();
  },[]);

  const getEmployees=async(page)=>{
   const res = await sendRequest('GET','/api/employees?page='+page,'');
   setEmployees(res.data);
   setRow(res.total);
   setPageSize(res.per_page);
   setClasTable('');
   setClasLoad('d-none');
  }

  const getDepartaments = async ()=>{
    const res = await sendRequest('GET','','/api/departaments','');
    setDepartaments(res);
  }

  const deleteEmployee=(id,name)=>{
    confirmation (name, '/api/employees/'+ id ,'employees');
    
  }

  const clear=() =>{
    setName('');
    setEmail('');
    setphone('');
    setDepartamentId('');

    const openModal=(op,n,e,o,d,em)=>{
      clear();
      setTimeout(()=>NameInput.current.focus(),600);
      setOperation(op);
      if (op==1){
        setTitle('Create employee');
      }
      else{
        setTitle('Update employee');
        setName(n);
        setEmail(e);
        setphone(o);
        setDepartamentId(d);
      }
    }

    const save=async(e)=>{
      e.preventDefault();
      if(operation==1){
        method='POST';
        url='/api/employees'
      }
      else{
        method='PUT';
        url='/api/employees/'+id;
      }
      const form ={name:name,email:email,phone:phone,departamentId:departamentId}
      const res = await sendRequest(method,form,url,'');
      if(method== 'PUT && res.status==true'){
        close.current.click();
      }
      if(res.status==true){
        clear();
        getEmployees(page);
        setTimeout(()=>NameInput.current.focus(),3000);
      }
    }

    const goPage= (p)=>{
      setPage(p);
      getEmployees(p);
    }

  return (
    <div className='container-fluid'>
      <DivAdd>
        <button className='btn btn-dark' data-bs-toggle='modal'
         data-bs-target='#modalEmployees' onClick={()=> openModal(1)}>
          <i className='fa-solid fa circle-plus'> </i>
        
        </button>
      </DivAdd>

      <DivTable col='10' off ='1' clasLoad={clasLoad} classTable={clasTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>TELEFONO</th>
                <th>CURSO</th>
                <th></th>
                <th></th>
                </tr>
          </thead>
          <tbody className='table-group-divider'>
          {employees.map((row,i) =>(
            <tr key={row.id}>
              <td>{i+1}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.departament}</td>
              
              <td> 

              <button className='btn btn-warning' data-bs-toggle='modal'
         data-bs-target='#modalEmployees' onClick={()=> openModal(2,row.name,row.email,row.phone,row.departamentId,row.id)}>
          <i className='fa-solid fa-edit'> </i>
        
        </button>
              </td>
              <td>
                <button className='btn btn-danger'onClick={()=> deleteEmployee(row.id, row.name)}>
                  <i className='fa-solid fa-trash'> 
                    
                  </i>
                </button>
              </td>

            </tr>


          ))}
          </tbody>

        </table>

       <PaginationControl changePage={page=>goPage(page)}
        next={true} limit ={pageSize} page={page} total={row}/> 

      </DivTable>

      <Modal title={title} modal='modalEmployees'>
        <div className='modal-body'>
          <form onSubmit={save}>
          <DivInput type ='text' icon='fa-user'
                        value ={name}className='form-control'
                        placeholder='Name' required='required'
                        ref={NameInput} handleChange={(e)=>setName(e.target.value)}/>

          <DivInput type ='email' icon='fa-at' value ={email}className='form-control'
           placeholder='Email' required='required'
           handleChange={(e)=>setEmail(e.target.value)}/> 

          <DivInput type ='Phone' icon='fa-phone' value ={phone}className='form-control'
           placeholder='Phone' required='required'
           handleChange={(e)=>setPhone(e.target.value)}/>

          <DivSelect  icon='fa-building'required='required' value={departamentId} className='form-select'
          options ={departaments} handleChange={(e)=>setDepartamentId(e.target.value)}/>

          <div className='d-grid col-10 mx-auto'>
              <button className='btn btn-success'>
                 <i className='fa-solid fa-save'></i>   Save</button>
            </div>


          </form>

        </div>
        
        <div className='modal-footer'>

          <button className='btn btn.dark' data-bs-dismiss='modal' ref={close}> CLOSE </button>
          
        </div>

      </Modal>

    </div>
  )
}
}

export default Employees