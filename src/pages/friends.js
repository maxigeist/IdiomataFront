import React from 'react';
import NavBar from '../components/navbar';
import { FriendsRequester } from '../util/requester/friendsRequester';
import { alert } from '../util/alert';
import { pageAuth } from '../util/pageAuth';
import Swal from 'sweetalert2';
import UserRequester from '../util/requester/userRequester';

const friendsRequester = new FriendsRequester();
const userRequester = new UserRequester();

class Friends extends React.Component {

  constructor(props){
    super(props)

    this.handleAuth()
  }

  render() {
    return (
        <div>
            <NavBar />
      <div className="container">

        <div className="row mt-4">
          
          <FriendRequests/>

          <SendFriendRequest/>

          <FriendList/>
        </div>
      </div>
      </div>
    );
  }

  //If user token is not valid, redirects to login page
  async handleAuth(){
    const invalid = await pageAuth();
    if(invalid)
        Swal.fire({
            icon: "warning",
            titleText: "Session expired",
            text: "You must login again",
            position:"top",
            padding: "3em 3em 3em 3em"
        }).then(() => {window.location.href = "/";})
        
}
}

export default Friends;

class SendFriendRequest extends React.Component{

  constructor(props){
    super(props)

    this.state = {emailSearched: ""}

    this.sendRequest = this.sendRequest.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  render(){
    return(
      <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                Send Friend Request
              </div>
              <div className="card-body">
                <div className="input-group">
                  <input type="text" className="form-control shadow-none" placeholder="Enter your friend's email" onChange={this.handleEmailChange} />
                  <button className="btn btn-primary" onClick={this.sendRequest}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
  }

  handleEmailChange(event){
    this.setState({emailSearched: event.target.value})
  }

  async sendRequest(){
    const response = await friendsRequester.sendFriendRequest(this.state.emailSearched)
    if(response.status === 200){alert('success', 'Request Sent', '')}
    else if(response.status === 404){alert('warning', 'Email not found')}
    else{alert('error', 'Something Went Wrong', '')}
  }
}

class FriendRequests extends React.Component{

  constructor(props){
    super(props)
    
    this.state = {requests: ""}
  }

  componentDidMount(){
    this.fetchRequests();
  }

  render(){

    if(this.state.requests === ""){

      return (
        <div className="card">
          <div className="card-header">
            Friend Requests
          </div>
        </div>
      )
    }

    return (
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            Friend Requests
          </div>
          <ul className="list-group list-group-flush" style={{ height: '500px', overflowY: 'auto' }}>
        {this.state.requests.map(request => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={request.id}>
            {request.requester.email}
            <div>
              <button className="btn btn-primary" onClick={() => this.acceptRequest(request.requester.id)}>
                Accept
              </button>
              <button className="btn btn-danger" onClick={() => this.rejectRequest(request.requester.id)}>
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
        </div>
      </div>
    )
  }

  async fetchRequests(){
    const response = await friendsRequester.getRequests();
    this.setState({requests: response.data.requestsReceived})
  }

  async acceptRequest(id) {
    const response = await friendsRequester.addFriend(id);
    if(response.status === 200){alert('success', 'Friend Accepted', ''); await this.fetchRequests()}
    else{alert('error', 'Something went wrong', '')}
  }

  async rejectRequest(id) {
    const response = await friendsRequester.rejectRequest(id);
    if(response.status === 200){alert('success', 'Friend Rejected', ''); await this.fetchRequests()}
    else{alert('error', 'Something went wrong', '')}
  }
}

class FriendList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      friends: [], // Initial empty friends array
    };
  }

  componentDidMount() {
    this.loadFriends();
  }

  async loadFriends() {
    const friendsData = (await userRequester.getFriends()).friends;

    friendsData.forEach((friend) => {
      friend.accuracy = this.calculateAccuracy(friend);
    })

    this.sortFriendsByAccuracy(friendsData);

    // Update the state with the loaded friends data
    this.setState({ friends: friendsData });
  }

  async removeFriend(id) {
    // Handle remove friend logic
    const response = await userRequester.removeFriend(id);
    if(response.status === 200){alert('success', 'Friend Removed', ''); await this.loadFriends()}
    else{alert('error', 'Something went wrong', '')}

  }

  calculateAccuracy(friend){
    let correctAnswers = 0;
    friend.wordAttempts.forEach((attempt) => {
      if(attempt.correct) correctAnswers += 1;
    })

    const accuracy = correctAnswers/friend.wordAttempts.length

    return accuracy? accuracy: 0;
  }

  sortFriendsByAccuracy(friends){
    friends.sort((a, b) => {
      if(a.accuracy > b.accuracy) return -1;
      else if(a.accuracy === b.accuracy) return 0;
      else return 1;
    })
  }

  render() {

    return (
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            My Friends
          </div>
          <ul className="list-group list-group-flush" style={{ heigth: '500px', overflowY: 'auto' }}>
            {this.state.friends.map((friend, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={friend.id}>
            {index + 1}. {friend.name} Accuracy: {(friend.accuracy * 100).toFixed(0)}%
            <button className="btn btn-danger" onClick={() => this.removeFriend(friend.id)}>
              Remove
            </button>
            </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}