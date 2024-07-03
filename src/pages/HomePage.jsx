import { Hero } from "../components/ui/Hero"
import Select from 'react-select'
import A from '../cmas/graph.png';

import { useEffect, useState } from "react";

let graph0=Array.from(Array(100+1),()=>new Array());
let graph1=Array.from(Array(100+1),()=>new Array());
let nodosAceptacion=new Array();

function createInputs(cantidadNodos){
  return Array.from(Array(cantidadNodos),(e,i)=>{
    return {'value':i+1,'label':i+1}
 })
}

function addEdge(tipo,from, to,n){
  console.log(tipo,from,to,n);
  if(from>n || to>n || n>100)alert("Datos no validos nodos menores o iguales a "+n);
  else{
    console.log(tipo,from,to,n);
    if(tipo==1 || tipo=='1') graph1[from].push(to);
    else graph0[from].push(to);
  }
}

function genTextAutomata(n){
  let res=new Array();
  res.push(n+" ");
  for(let i=0;i<n;i++){
    let s="";
    s+=graph0[i+1].length+" ";
    for(let j in graph0[i+1]){
      s+=graph0[i+1][j]+" ";
    }
    s+=graph1[i+1].length+" ";
    for(let j in graph1[i+1]){
      s+=graph1[i+1][j]+" ";
    }
    res.push(s);
  }
  res.push(nodosAceptacion.length+" ");
  nodosAceptacion.map((e)=>res.push(e+" "));
  return res;
}

function genereteTxt(arr){
  const blob=new Blob(arr,{'type':'text/plain;charset=utf-8'});
  const element=document.createElement('a');
  element.href=URL.createObjectURL(blob);
  element.download="input.txt";
  document.body.appendChild(element);
  element.click();
}
function addNodoAceptacion(nodo,n){
  if(nodo>n || n>100)alert("Datos no validos nodos menores o iguales a "+n);
  else{
    alert("Ingresa otro dato o genera el automata");
    nodosAceptacion.push(nodo);
  }
}

function HomePage() {
  const [nodos,setnodos]=useState(0);
  const [viewpanel,setViewPanel]=useState(0);
  const [varibles,setVariables]=useState(createInputs(100));
  const [tipo,setTipo]=useState(0);
  const [from,setFrom]=useState(0);
  const [to,setTo]=useState(0);
  const [nodoAceptacion,setNodoAceptacion]=useState(0);
  const [goResult,setGoResult]=useState(0);
  useEffect(()=>{
    document.getElementById("nodos").style.display=(!viewpanel?"block":"none");
    document.getElementById("aristas").style.display=(viewpanel?"block":"none");
    document.getElementById("res").src=A;
  },)
  return (
  <>
  <div className="container mx-auto text-6xl flex items-center justify-center uppercase">
    <h1>Covertir de AFND A AFN</h1>
  </div>
   <Hero/>
   <div className="container mx-auto">
   <form >
      {/* register your input into the hook by invoking the "register" function */}
      <div  id="nodos">
        <label>Numero de Nodos</label>
          <input className="cont" name="NumeroNodos" type="text" onChange={(e)=>{setnodos(e.target.value);console.log(nodos)}}/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e)=>{
            e.preventDefault();
            console.log(nodos);
            setViewPanel(1);
          }}>Generar Transiciones</button>
      </div>
      <div id="aristas">
        <label htmlFor="Arista">Transicion</label>
        <label htmlFor="">Tipo</label>
        <Select name="" id=""  options={[
          { value: '1', label: '1' },
          { value: '0', label: '0' },
        ]} onChange={(e)=>{setTipo(e.value)}}/>
        <label htmlFor="">From</label>
        <Select  options={varibles} onChange={(e)=>setFrom(e.value)}>
        </Select>
        <label htmlFor="">to</label>
        <Select  options={varibles} onChange={(e)=>setTo(e.value)}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e)=>{
          e.preventDefault();
          console.log(tipo);
          addEdge(tipo,from,to,nodos);
          alert("Ingresa otra arista o genera el json")
        }}>Agregar transicion</button>
        <br />
        <label htmlFor="">Nodo Aceptacion</label>
        <Select  options={varibles} onChange={(e)=>setNodoAceptacion(e.value)}/>
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
         (e)=>{
          e.preventDefault();
          console.log(nodoAceptacion);
          addNodoAceptacion(nodoAceptacion,nodos);
         }
        }>Agregar Nodo Aceptación</button>
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
         (e)=>{
          e.preventDefault();
          genereteTxt(genTextAutomata(nodos));
          setGoResult(true);
         }
        }>Generar Automata</button>
      </div>
    </form>
    </div>
    <div className="flex items-center justify-center">
    <img src="" alt=""  id="res" style={{width:'500px',height:'500px'}}/>
    </div>
  </>
  )
}

export default HomePage