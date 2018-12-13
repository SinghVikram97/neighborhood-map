import React,{Component} from "react";
import ListItem from "./ListItem"
class SideBar extends Component{
    render(){
        return (
        <ol className="venueList">
            {
                this.props.venues.map((venue,index)=>{
                    return <ListItem key={index}{...venue} handleListItemClick={this.props.handleListItemClick}/>
                })
            }
        </ol>)
    }
}
export default SideBar;