import React from "react"

export class Sentence extends React.Component{

    render(){
        return(
            <div className="row">
                <AddSentence/>
            </div>
        )}
}

class AddSentence extends React.Component{


    render(){
        return(
            <div>
                Hola
            </div>
        )
    }
}