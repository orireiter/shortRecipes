import React from 'react';

export function Redirect(props: {redirectUrl: string}) {
    window.location.assign(props.redirectUrl);
    return (
      <div></div>
    );
  }
  