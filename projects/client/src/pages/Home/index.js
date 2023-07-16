import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Clock from 'react-live-clock';

const HomePage = () => {


  return (
    <div>
      <Clock
      className="text-white"
          format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
          style={{fontSize: '1.5em'}}
          ticking={true} />
    </div>
  );
};
  
  export default withAuth(HomePage);