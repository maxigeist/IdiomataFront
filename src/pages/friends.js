import React from 'react';
import NavBar from '../components/navbar';
import { FriendsRequester } from '../util/requester/friendsRequester';
import { alert } from '../util/alert';
import { pageAuth } from '../util/pageAuth';
import Swal from 'sweetalert2';
import UserRequester from '../util/requester/userRequester';
import { Modal } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';
import { StatsRequester } from '../util/requester/statsRequester';


const friendsRequester = new FriendsRequester();
const userRequester = new UserRequester();

class Friends extends React.Component {

  constructor(props){
    super(props)
    this.t=this.props.t;

    this.handleAuth()
  }

  render() {
    return (
        <div>
            <NavBar t={this.props.t}/>
      <div className="container">

        <div className="row mt-4">
          
          <FriendRequests t={this.t}/>

          <SendFriendRequest t={this.t}/>

          <FriendList t={this.t}/>
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
          titleText: this.t("global:header:Session-expired"),
          text: this.t("global:header:You-must-login-again"),
          position:"top",
          padding: "3em 3em 3em 3em"
        }).then(() => {window.location.href = "/";})
        
}
}

export default Friends;

class SendFriendRequest extends React.Component{

  constructor(props){
    super(props)
    this.t = this.props.t
    this.state = {emailSearched: ""}

    this.sendRequest = this.sendRequest.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
  }

  render(){
    return(
      <div className="col-md-4">
            <div className="card" style={{border:"none"}}>
              {/* <div className="card-header">
                Send Friend Request
              </div> */}
              <h4 className="card-header text-white bg-primary">{this.t("global:header:Send-friend-request")}</h4>
              <div className="card-body">
                <div className="input-group">
                  <input type="text" className="form-control shadow-none" placeholder={this.t("global:header:Enter-your-friend's-email")} onChange={this.handleEmailChange} />
                  <button className="btn btn-primary" onClick={this.sendRequest}>
                  {this.t("global:header:Send")}
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
    if(response.status === 200){alert('success', this.t('global:header:Request-Sent'))}
    else if(response.status === 404){alert('warning', this.t('global:header:Email-not-found'))}
    else{alert('error', this.t('global:header:Something-went-wrong'))}
  }
}

class FriendRequests extends React.Component{

  constructor(props){
    super(props)
    this.t = this.props.t;
    this.state = {requests: ""}
  }

  componentDidMount(){
    this.fetchRequests();
  }

  render(){

    if(this.state.requests === ""){

      return (
        <div className="card">
          <h4 className="card-header text-white bg-primary">{this.t("global:header:Friends-request")}</h4>
          <div className="card-header text-white bg-primary">
            Friend Requests
          </div>
        </div>
      )
    }

    return (
      <div className="col-md-4">
        <div className="card" style={{border:"none"}}>
          {/* <div className="card-header text-white bg-primary">
            Friend Requests
          </div> */}
          <h4 className="card-header text-white bg-primary">{this.t("global:header:Friends-request")}</h4>
          <ul className="list-group list-group-flush" style={{ height: '500px', overflowY: 'auto' }}>
        {this.state.requests.map(request => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={request.id}>
            {request.requester.email}
            <div>
              <button className="btn btn-primary" onClick={() => this.acceptRequest(request.requester.id)}>
                {this.t('global:header:Accept')}
              </button>
              <button className="btn btn-danger" onClick={() => this.rejectRequest(request.requester.id)}>
                {this.t('global:header:Reject')}
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
    if(response.status === 200){Swal.fire(this.t('global:header:Friend-Accepted'), '', 'success').then(() => {window.location.href = "/friends";})}
    else{alert('error', this.t('global:header:Something-went-wrong'), '')}
  }

  async rejectRequest(id) {
    const response = await friendsRequester.rejectRequest(id);
    if(response.status === 200){alert('success', this.t('global:header:Friend-Rejected')); await this.fetchRequests()}
    else{alert('error',this.t('global:header:Something-went-wrong'))}
  }
}

class FriendList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      friends: [], // Initial empty friends array
      showFriendStats: false,
      friendShownId: 0,
      friendShownName: ""
    };

    this.handleShowFriendsStats = this.handleShowFriendsStats.bind(this)
    this.t = this.props.t;
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
    if(response.status === 200){alert('success', this.t('global:header:Friend-Removed')); await this.loadFriends()}
    else{alert('error', this.t('global:header:Something-went-wrong'))}

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
        <div className="card" style={{border:"none"}}>
          {/* <div className="card-header bg-success">
            My Friends
          </div> */}
          <h4 className="card-header bg-success text-white">{this.t("global:header:Friends")}</h4>
          <ul className="list-group list-group-flush" style={{ heigth: '500px', overflowY: 'auto' }}>
            {this.state.friends.map((friend, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={friend.id}>
            {index + 1}. {friend.name} 
            <button className='btn btn-info' onClick={() => this.handleShowFriendsStats(friend.id, friend.name)}>{this.t('global:header:See-Stats')}</button>
            <button className="btn btn-danger" onClick={() => this.removeFriend(friend.id)}>
            {this.t('global:header:Remove')}
            </button>
            </li>
            ))}
          </ul>
        </div>
        <Modal className="modal-xl" show={this.state.showFriendStats} onHide={() => this.setState({ showFriendStats: false })}>
              <Modal.Header closeButton>
                  <Modal.Title>{this.t('global:header:Stats-of')} {this.state.friendShownName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FriendStats friendId={this.state.friendShownId}/>
              </Modal.Body>
        </Modal>
      </div>
    );
  }

  async handleShowFriendsStats(friendShownId, friendShownName){
    this.setState({friendShownId: friendShownId, friendShownName: friendShownName, showFriendStats: true})
  }
}

const statsRequester = new StatsRequester();

class FriendStats extends React.Component{

  constructor(props){
      super(props)

      this.state = {percentage:0, attempts:0,language: "", category: "", game: "", list_with_five_words : []}

      this.handleAuth();
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleLanguageChange = this.handleLanguageChange.bind(this);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.handleGameChange = this.handleGameChange.bind(this);

      this.makeFiveWords = this.makeFiveWords.bind(this);
  }
async componentDidMount() {
  const attempts = await statsRequester.getWordsAttemptByUserId(this.props.friendId, this.state.category, this.state.game);
  this.setState({attempts: attempts.length});
  const list_attemps_errors = await statsRequester.getlistWithWordAttemptsByUserId(this.props.friendId, this.state.category, this.state.game);
  var act_percentage = 0;
  if (attempts.length !== 0){
      for (const word of attempts){
          if (word.correct){
              act_percentage +=1;
          }
      }
      this.setState({percentage:parseInt((act_percentage/attempts.length)*100)});  
  }
  
  else{
      this.setState({percentage:0});
  }

  this.setState({list_with_five_words: list_attemps_errors.slice(0,5)});

}
  render(){
      return(
          <div>
          <div class="container w-100 mt-2 text-center">
              <div class="row">
                  <div class="col-sm m-4">

                      <div className="row">
                  
                          
                          <h1 className="accuracy-title">{this.t('global:header:Accuracy-rate')}</h1>
                          
                          </div>
                          <div className="row">
                          <ChangingProgressProvider initialValue={0} newValue={this.state.percentage} >
                          {percentage => (
                          <CircularProgressbar value={percentage} text={`${percentage}%`} background={{}}/>
                              )}
                          </ChangingProgressProvider>
                          
                          </div>
                          
                      
                  
                      
                  
                  </div>
                  <div class="col-sm div-five-words bg-primary ms-4 p-0" >
                  <h2 className="five-words-h2 mb-4">{this.t('global:header:Five-words-that-your-friend-struggles-the-most-with')}</h2>
                  <div className="container text-center">
                  <div className="row align-items-start">
                      <div className="col"><h4 className="h4-word-att">{this.t('global:header:Word')}</h4></div><div className="col"><h4 className="h4-word-att">{this.t('global:header:Mistakes')}</h4></div>
                  </div>
                  </div>
                  <this.makeFiveWords/>
                  <h3 className="attempts-title">{this.t("global:header:Total-attempts")}:{this.state.attempts}</h3>
                  
                  </div>
              </div>
              </div>
              

          </div>

      );
  }

  async handleLanguageChange(event){
      await this.setState({language: event.target.value})
      await this.componentDidMount();

  }
  async handleCategoryChange(event){
      await this.setState({category: event.target.value})
      await this.componentDidMount();
  }

  async handleGameChange(event){
      
      await this.setState({game: event.target.value})
      await this.componentDidMount();
  }
  async handleAuth(){
      const invalid = await pageAuth();
      if(invalid)
          Swal.fire({
            icon: "warning",
            titleText: this.t("global:header:Session-expired"),
            text: this.t("global:header:You-must-login-again"),
            position:"top",
            padding: "3em 3em 3em 3em"
          }).then(() => {window.location.href = "/";})      
  }
  makeFiveWords(){
      const options = this.state.list_with_five_words.map((word, index) => (
          <div className="mt-3">
              <div className="row ">
                  <div className="col">
                      <h4 key={index} value={word} style={{color:"white"}}><i class="bi bi-arrow-right-short m-1"></i>{this.state.list_with_five_words[index].word}</h4>
                  </div>
                  <div className="col">
                      <h4 style={{color:"white"}}>{this.state.list_with_five_words[index].errors}</h4>
                  </div>
              </div>
          </div>
      ));
      return(
          
          options
      )
  }
}