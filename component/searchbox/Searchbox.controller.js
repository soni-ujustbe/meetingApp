import React, { Component } from "react";
import { connect } from "react-redux";
import { unselectallConnect } from "../mentor/Mentor.action";
import { removementorSelectlpAll } from "../selectmentorinvite/Selectmentorinvitee.action";
import Searchbox from "./Searchbox";
import { makesearchid, openSearchBox, removeAllsearchBox, removeConnectsearchBox, removedSearchAllMeetingData, searchboxgroupinvitation, searchboxsingleinvitation } from "./Searchbox.action";

export class Searchboxcontroller extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("controller invitation", this.props);
    return (
      <Searchbox
        data={this.props.data}
        openbox={this.props.openbox}
        uniqueId={this.props.uniqueId}
        removeFrompannel={this.props.removeFrompannel}
        groupinvitee={this.props.groupmeeting}
        opengroupInvitation={this.props.onGroupInvitationBox}
        removedall={this.props.removedall}
        singleinvitation={this.props.singleinvitation}
        sendmeeting={this.props.sendmeeting}
        removemeeting={this.props.removemeeting}
      />
      // <p>test mentor</p>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.searchbox.partner,
  openbox: state.searchbox.showbox,
  uniqueId: state.searchbox.uniqueId,
  groupmeeting: state.searchbox.groupinvitee,
  sendmeeting: state.searchbox.sendmeeting,
  
});

// const mapDispatchToProps = {

// }

const mapDispatchToProps = (dispatch) => ({
  removeFrompannel: (partnerId) => dispatch(removeConnectsearchBox(partnerId)),
  singleinvitation: () => dispatch(searchboxsingleinvitation()),
  //removedall: () => dispatch(removeAll()),
  onGroupInvitationBox: () => {
    dispatch(openSearchBox());
    dispatch(searchboxgroupinvitation());
    dispatch(makesearchid());
  },
  removedall: () => {
    dispatch(removeAllsearchBox());
    //dispatch(removesearchSelectlpAll())
    dispatch(removedSearchAllMeetingData());
    dispatch(unselectallConnect())
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searchboxcontroller);