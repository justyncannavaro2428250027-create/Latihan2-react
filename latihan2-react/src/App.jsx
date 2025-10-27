import React, {Suspense} from "react"
import {BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom"

const Home = React.lazy( ()=> import('./components/Home'))
const KategoriList = React.lazy( ()=> import('./components/Kategori/List'))
const KategoriCreate = React.lazy( ()=> import('./components/Kategori/Create'))
const KategoriEdit = React.lazy( ()=> import('./components/Kategori/Edit')) 
const MenuCreate = React.lazy( ()=> import('./components/Menu/Create'))
const MenuList = React.lazy( ()=> import('./components/Menu/List'))
const MenuEdit = React.lazy( ()=> import('./components/Menu/Edit')) 

function App() {

  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">React CRUD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="kategori">Kategori</NavLink>
        </li>
            <li class="nav-item">
          <NavLink className="nav-link" to="menu">Menu</NavLink>
          
        </li>
      </ul>
      
    </div>
  </div>
</nav>
      <Suspense fallback ={<div>Loading.....</div>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='kategori' element={<KategoriList/>}/>
        <Route path='kategori/create' element={<KategoriCreate/>}/>
        <Route path='kategori/edit/:id' element={<KategoriEdit/>}/>
        <Route path='menu' element={<MenuList/>}/>
        <Route path='menu/create' element={<MenuCreate/>}/>
        <Route path='menu/edit/:id' element={<MenuEdit/>}/>

        </Routes>
      </Suspense>
    </Router>
  )
}

export default App