import React from "react";
import "./NotFound.css";
import LookFor from "../Assets/img/look-for-bg.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  // redirection vers Accueil
  let navigate = useNavigate();
  const routeAccueil = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 container-notfound">
        <div className="flex-md-row-reverse justify-content-center  text-center row">
          <div className=" col-md-5 mt-5-lg ">
            <p className="fs-3">
              <span className="text-danger number">4</span>
              <span className="text-danger number">0</span>
              <span className="text-danger number">4</span>
            </p>

            <p className="fs-3">
              <span className="text-danger">Oupps!</span> Page non trouvée.
            </p>
            <p className="lead">La page que vous recherchez n'existe pas.</p>

            <button onClick={routeAccueil} className="btn btn-primary">
              Retour Accueil
            </button>
          </div>
          <div className=" col-md-5 img-notfound ">
            <img src={LookFor} alt="" className="img-fluid " />
          </div>
        </div>
      </div>
    </>
  );
}
