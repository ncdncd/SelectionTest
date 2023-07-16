import withAuth from "../../components/withAuth";
import Clock from 'react-live-clock';

const HomePage = () => {

  return (
    <div>
      <div className="grid grid-col-2 grid-flow-row">
        <div>
      <Clock
      className="ml-2 text-white"
          format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
          style={{fontSize: '1.5em'}}
          ticking={true} />
          </div>
        </div>
    </div>
  );
};
  
  export default withAuth(HomePage);