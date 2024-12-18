
// eslint-disable-next-line no-unused-vars
import React, {useEffect,useState}from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import {confirmation, sendRequest} from '../../functions';


const Departaments = () => {
const[departaments,setDepartaments] = useState([]);
const[clasLoad,setClasLoad] = useState('');
const[clasTable,setClasTable] = useState('d-none');
useEffect(()=>{
  getDepartaments();
},[]);
const getDepartaments = async () => {
  const res = await sendRequest ('GET','','/api/departaments');
  setDepartaments(res);
  setClasTable('');
  setClasLoad('d-none');
}
const deleteDepartament = (id, name) => {
  confirmation(name,('/api/departaments/'+id,'/'));
}
  return (
    <div className='container-fluid'>
      <DivAdd>
        <Link to='create' className='btn btn-dark'>
        <i className='fa-solid fa-circle-plus'></i> Add
        </Link>
      </DivAdd>

      <DivTable col='6' off ='3' clasLoad={clasLoad} classTable={clasTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th><th>CURSO</th><th></th><th></th></tr>
          </thead>
          <tbody className='table-group-divider'>
          {departaments.map((row,i) =>(
            <tr key={row.id}>
              <td>{i+1}</td>
              <td>{row.name}</td>
              <td> 
                <Link to={'/edit/'+ row.id}className='btn btn-warning'>
                <i className='fa-solid fa-edit'> </i>
                </Link>
              </td>
              <td>
                <button className='btn btn-danger'onClick={()=> deleteDepartament(row.id, row.name)}>
                  <i className='fa-solid fa-trash'> 
                    
                  </i>
                </button>
              </td>

            </tr>


          ))}
          </tbody>

        </table>

      </DivTable>
    </div>
  )
}

export default Departaments

