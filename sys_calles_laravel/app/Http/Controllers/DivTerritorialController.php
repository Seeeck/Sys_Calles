<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DivTerritorialController extends Controller {

    //Muestra las regiones de Chile
    public function showRegiones(Request $request){
        $regiones=DB::table('REGION')->get();
        return response()->json($regiones);
    }

    //Muestra las provincias segun la region
    //Params:id_region
    public function showProvincias(Request $request){
        $provincias=DB::table('PROVINCIA')->where('region_fk',$request->input('id_region'))
                                          ->get();
        return response()->json($provincias);
    }

    //Muestra las Ciudades segun la provincia
    //Params:id_provincia
    public function showCiudades(Request $request){
        $ciudades=DB::table('CIUDAD')->where('provincia_fk',$request->input('id_provincia'))
                                          ->get();
        return response()->json($ciudades);
        
    }
}