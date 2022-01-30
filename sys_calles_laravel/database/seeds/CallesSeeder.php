<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CallesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {  
        $ciudades=DB::table('CIUDAD')->get();
        foreach ($ciudades as $key => $ciudad) {
            $ciudad_nombre=$ciudad->nombre_ciudad;
            $ciudad_fk=$ciudad->id_ciudad;
            $provincia_fk=$ciudad->provincia_fk;
            $region_fk=DB::table('PROVINCIA')
                       ->where("id_provincia",$provincia_fk)
                       ->get()
                       ->first()->region_fk;
                       
            for($i=1;$i<=7;$i++){

                DB::table('CALLE')->insert(["nombre_calle"=>$ciudad_nombre." calle ".strval($i),
                                        "ciudad_fk"=>$ciudad_fk,
                                        "provincia_fk"=>$provincia_fk,
                                        "region_fk"=>$region_fk]);
            }
            
        }
    }
}
