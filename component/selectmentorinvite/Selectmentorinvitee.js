import React, { useEffect, useMemo, useState } from "react";

function SelectMentorinvitee(props) {
  const [error, seterror] = useState(false)
  console.log("selected data", props);

  function openInvitationBox() {
    if (props.data.selectedLP.length<2) {
      seterror(true);
    }
    else{
      props.opengroupInvitation();
      seterror(false);
    }
  }

  // useMemo(() => function, input)

  useEffect(() => {
    if (props.data.selectedLP.length<2 && props.data.selectedLP.length>0 ) {
      seterror(true);
    }
    else{
      //props.opengroupInvitation();
      seterror(false);
    }
    
  }, [error])

  return (
    <div className="selectedPartner">
      {props.data.selectedLP.length > 0 ? (
        <>
          <h3>Selected Partner({props.data.selectedLP.length})</h3>
          <ul>
            {props.data.selectedLP.map((selected) => (
              <li>
                <div className="lpname">
                  {selected.firstName} {selected.lastName}
                </div>
                <div
                  className="removeBtn"
                  onClick={() => props.removelp(selected._id)}
                >
                  X
                </div>
              </li>
            ))}
          </ul>
          <button className="" onClick={() => openInvitationBox()}>Send Invitation</button>
        </>
      ) : (
        <p>Select Partner</p>
      )}
      {
        props.data.selectedLP.length<2 && props.data.selectedLP.length>0?<>{error?<p>Select multiple Listed Partner</p>:null}</>:null
      }
    </div>
  );
}

export default SelectMentorinvitee;