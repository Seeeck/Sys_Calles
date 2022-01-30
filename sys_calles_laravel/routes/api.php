<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalleController;
use App\Http\Controllers\DivTerritorialController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//DATOS REGIONES/PROVINCIAS/CIUDADES
Route::get('/regiones',"DivTerritorialController@showRegiones");
Route::get('/provincias',"DivTerritorialController@showProvincias");
Route::get('/ciudades',"DivTerritorialController@showCiudades");

//CRUD calles
Route::post('/saveCalle', "CalleController@create");
Route::get('/showCalle', "CalleController@show");
Route::get('/showCalleByNombre', "CalleController@showCalleByNombre");
Route::post('/updateCalle', "CalleController@update");
Route::delete('/deleteCalle', "CalleController@delete");

