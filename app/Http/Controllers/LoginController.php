<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Login;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    public function register(Request $request)
    {
       $data=Login::create([
        "name"=>$request->name,
        "password"=>Hash::make($request->password)
       ]);
       return(["data"=>$data]);

    }

    public function login(Request $request){
       $data=Login::where("name",$request->name)->first();
       if($data && Hash::check($request->password,$data->password)){
        return response(["message"=>"login successfully"],200);
       }
       else{
        return response(["error"=>"check your password"],401);
       }
       return $data;




    }
}
