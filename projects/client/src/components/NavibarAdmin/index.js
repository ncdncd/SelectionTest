import {
  Link,
} from "react-router-dom";
import { Navbar} from 'flowbite-react';


const NavibarAdmin = () => {

    function handleLogOut(){
        localStorage.removeItem("token");
    }

  return (
  <div className=''>
    <Navbar
    class='bg-[#9c280e]'
    fluid={true}
    rounded={true}
    >
    <Navbar.Brand>
      <Link to="/"><h1 className='text-xl font-serif text-gray-100'>AA Company Admin</h1></Link>
    </Navbar.Brand>
    <div className="flex md:order-2">
 
        <Navbar.Toggle />
        </div>
          <Navbar.Collapse className='text-gray-100'>
            <Navbar.Link href="/generatepayroll" class='text-gray-100 hover:text-gray-800 transition'>
              Employee Payroll
            </Navbar.Link>
            <Navbar.Link href="/register" class='text-gray-100 hover:text-gray-800 transition'>
              Register new employee
            </Navbar.Link>
            <Navbar.Link href="/" onClick={handleLogOut} class='text-gray-100 hover:text-gray-800 transition'>
              Log Out
            </Navbar.Link>
          </Navbar.Collapse>
          
    </Navbar>
  </div>
  )
}

export default NavibarAdmin