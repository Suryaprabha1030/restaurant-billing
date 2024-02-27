<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bill;


class billController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $data= Bill::all();
       return $data;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->only(["name","price","quantity","variety","catagory"]);
        Bill::create($data);
        return response(["data"=>$data],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        $data=$request->only(["name","price","quantity","variety","catagory"]);
        $bill->update($data);
        return response(["message"=>"data updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        $bill->delete();
        return  response(["message"=>"data deleted successfully"],200);
    }

    public function nonvegmain(Bill $bill){
        $data=Bill::where("variety","main")->where("catagory","non-veg")->select("price","name","quantity")->get();
        return $data;

    }
    public function vegmain(Bill $bill){
        $data=Bill::where("variety","main")->where("catagory","veg")->select("price","name","quantity")->get();
        return $data;

    }
    public function vegs(Bill $bill){
        $data=Bill::where("variety","starter")->where("catagory","veg")->select("price","name","quantity")->get();
        return $data;

    }
    public function nonvegs(Bill $bill){
        $data=Bill::where("variety","starter")->where("catagory","non-veg")->select("price","name","quantity")->get();
        return $data;

    }


}
