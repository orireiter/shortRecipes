import { logOut } from '../logic/authLogic';


const Home = (): JSX.Element => {
    return (
        <div>
            <div>
                <p>
                    home
                </p>
            </div>
            <div>
                <button onClick={() => logOut()}>
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Home;
  