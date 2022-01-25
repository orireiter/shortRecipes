import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Redirect = (props: {redirect_to: string}): JSX.Element => {
    let navigate = useNavigate();
    
    useEffect(() => {
      navigate(props.redirect_to, {replace: true});
    })
    
    return (
        <div>
        </div>
    );
  }