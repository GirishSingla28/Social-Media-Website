import React from 'react'
import "./RightBar.scss"
function RightBar(){
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <p>
              <span>Jane Doe</span> changed her cover page
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <p>
              <span>Jane Doe</span> likes the post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <div className="online"/>
              <span>Jane Doe</span> 
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <div className="online"/>
              <span>Jane Doe</span> 
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNcWk-1bhx5vPvrFWIB6TtT94HqvADVtSRw&usqp=CAU"
                alt=""
              />
              <div className="online"/>
              <span>Jane Doe</span> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar;
