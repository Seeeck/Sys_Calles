<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CalleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    //Crear calles
    public function create(Request $request)
    {
        //
        $validate_data=$request->validate(['nombre_calle'=>'required',
                                           'region_fk'=>'required',
                                           'provincia_fk'=>'required',
                                           'ciudad_fk'=>'required']);

        $nombre_calle=$request->input('nombre_calle');
        $region_fk=$request->input('region_fk');
        $provincia_fk=$request->input('provincia_fk');
        $ciudad_fk=$request->input('ciudad_fk');
        
        DB::table('CALLE')->insert(["nombre_calle"=>$nombre_calle,
                                    "region_fk"=>$region_fk,
                                    "provincia_fk"=>$provincia_fk,
                                    "ciudad_fk"=>$ciudad_fk]);

        $calle=DB::table('CALLE')->max('id_calle');
        $calle=DB::table('CALLE')->where('id_calle','=',$calle)->first();
        $id_calle=$calle->id_calle;
        
        return response()->json(["respuesta"=>"Calle creada",
                                 "nombre_calle"=>$nombre_calle,
                                 "id_calle"=>$id_calle,
                                 "is_post"=>true]);
    }

    //Mostrar calles y paginar
    public function show(Request $request){
       
        $calles=DB::table('CALLE')
                    ->select('CALLE.id_calle',
                             'CALLE.nombre_calle as nombre',
                             'CIUDAD.nombre_ciudad as ciudad',
                             'PROVINCIA.nombre_provincia as provincia',
                             'REGION.nombre_region as region')
                    ->rightJoin('CIUDAD','CALLE.ciudad_fk','=','CIUDAD.id_ciudad')
                    ->rightJoin('PROVINCIA','CALLE.provincia_fk','=','PROVINCIA.id_provincia')
                    ->rightJoin('REGION','CALLE.region_fk','=','REGION.id_region')
                    ->paginate(5);
                    
        return response()->json($calles);
    }

    //Mostrar calle por nombre
    public function showCalleByNombre(Request $request){
        $request->validate(['nombre'=>'required']);
        $nombre=$request->input('nombre');
        $calles=DB::table('CALLE')
                    ->select('CALLE.id_calle',
                             'CALLE.nombre_calle as nombre',
                             'CIUDAD.nombre_ciudad as ciudad',
                             'PROVINCIA.nombre_provincia as provincia',
                             'REGION.nombre_region as region')
                    ->rightJoin('CIUDAD','CALLE.ciudad_fk','=','CIUDAD.id_ciudad')
                    ->rightJoin('PROVINCIA','CALLE.provincia_fk','=','PROVINCIA.id_provincia')
                    ->rightJoin('REGION','CALLE.region_fk','=','REGION.id_region')
                    ->where('nombre_calle','like','%'.$nombre.'%')
                    ->paginate(5);
        return response()->json($calles);
    }

    //Actualizar calle

    public function update(Request $request){
        $id_calle=$request->input('id_calle');
        $nombre_calle=$request->input('nombre_calle');
        $is_update=DB::table('CALLE')
                   ->where('id_calle', $id_calle)
                   ->update(['nombre_calle' => $nombre_calle]);
        if($is_update){
            return response()->json(['respuesta'=>'Calle actualizada',
                                      'calle_id'=>$id_calle,
                                       'nombre de la calle'=>$nombre_calle,
                                      'actualizada'=>true]);
        }else{
            return response()->json(['respuesta'=>'No existe la calle']);
        }
        
    }

    //Eliminar calle

    public function delete(Request $request){
        $id_calle=$request->input('id_calle');
        $calle=DB::table('CALLE')
                   ->where('id_calle','=',$id_calle)->first();
        if(is_null($calle)){
            return response()->json(['respuesta'=>'No existe la calle']); 
        }
        DB::table('CALLE')
            ->where('id_calle','=',$id_calle)
            ->delete();
        
        $nombre_calle=$calle->nombre_calle;
        return response()->json(['respuesta'=>'Calle eliminada',
                                 'id_calle'=>$id_calle,
                                 'nombre_calle'=>$nombre_calle,
                                 'eliminada'=>true]);
        
    }

}
