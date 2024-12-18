<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Departament;
use DB;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{

    public function index()
    {
        $employees =  Employee:: select('employees.*', 'departaments.name as department')
        ->join('departaments', 'department_id', '=', 'employees.departament_id')
        ->paginate(10);
        return response()->json($employees);
    }


    public function store(Request $request)
    {
       $rules =[
        'name' =>'required|string|max:100',
        'email' =>'required|email|max:80',
        'phone' =>'required|max:15',
        'departament_id' =>'required|numeric'
       ] ;

       $validator = \Validator::make($request->input(), $rules);
       if ($validator->fails()) {
           return response()->json([
            'status'=>false,
            'errors'=>$validator->errors()->all()
        ], 400);
       }

         $employee = new Employee($request->input());
         $employee->save();
         return response()->json([
            'status'=>true,
            'emessage'=>'Se creo satisfactoriamente'
        ], 200);


    }


    public function show(Employee $employee)
    {
        return response()->json(['status'=>true, 'data'=>$employee]);
    }


    public function update(Request $request, Employee $employee)
    {
        $rules =[
            'name' =>'required|string|max:100',
            'email' =>'required|email|max:80',
            'phone' =>'required|max:15',
            'departament_id' =>'required|numeric'
           ] ;

           $validator = \Validator::make($request->input(), $rules);
           if ($validator->fails()) {
               return response()->json([
                'status'=>false,
                'errors'=>$validator->errors()->all()
            ], 400);
           }
           $employee->update($request->input());
           return response()->json([
            'status'=>true,
            'message'=>'Actualizado satisfactoriamente'
        ], 200);
    }


    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json([
           'status'=>true,
           'message'=>'Eliminado satisfactoriamente'
        ], 200);

    }

    public function EmployeesByDepartament()
    {
        $employees = Employee:: select (DB::raw ('count(employees.id)as count,
        departaments.name'))
        ->join ('departaments', 'departaments.id','=','employees.departament_id')
        ->groupBy ('departaments.name')-get();
        return response()->json($employees);
    }


    public function all(){
        $employees =  Employee:: select('employees.*',
         'departaments.name as department')
        ->join('departaments', 'department_id', '=', 'employees.departament_id')
        ->get();
        return response()->json($employees);
    }


}
