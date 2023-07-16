
import {
  Link,
} from "react-router-dom";
import { Navbar} from 'flowbite-react';


const Navibar = () => {

    function handleLogOut(){
        localStorage.removeItem("token");
    }

  return (
  <div className=''>
    <Navbar
    class='bg-[#0E8388]'
    fluid={true}
    rounded={true}
    >
    <Navbar.Brand>
      <Link to="/"><h1 className='text-xl font-serif text-gray-100'>AA Company</h1></Link>
    </Navbar.Brand>
    <div className="flex md:order-2">
 
        <Navbar.Toggle />
        </div>
          <Navbar.Collapse className='text-gray-100'>
            <Navbar.Link href="/clock" class='text-gray-100 hover:text-gray-800 transition'>
              Clock in and out
            </Navbar.Link>
            <Navbar.Link href="/log" class='text-gray-100 hover:text-gray-800 transition'>
              Check your attendance
            </Navbar.Link>
            <Navbar.Link href="/" onClick={handleLogOut} class='text-gray-100 hover:text-gray-800 transition'>
              Log Out
            </Navbar.Link>
          </Navbar.Collapse>
          
    </Navbar>
  </div>
  )
}

export default Navibar