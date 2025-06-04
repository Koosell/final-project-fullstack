import React from 'react';
import './css/Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: "Vendri Setyawan",
      nim: "23.11.5523",
      role: "Team Member",
      photo: "https://i.imgur.com/XTI1XdN.jpeg"
    },
    {
      name: "Nazal Syamaidzar Mahendra",
      nim: "23.11.5547",
      role: "Team Member",
      photo: "https://i.imgur.com/jSzMYwD.jpeg"
    },
    {
      name: "Lekat Citra Fitrianti",
      nim: "23.11.5501",
      role: "Team Member",
      photo: "https://i.imgur.com/Mr053oA.jpeg"
    },
    {
      name: "Roy Devgantara Purba",
      nim: "23.11.5565",
      role: "Team Member",
      photo: "https://i.imgur.com/afs51Vy.jpeg"
    },
    {
      name: "Muhammad Fachri Agus M",
      nim: "23.11.5544",
      role: "Team Member",
      photo: "https://i.imgur.com/SuL48SF.jpeg"
    }
  ];

  return (
    <div className="team-page">
      <div className="team-header">
        <h1>Team</h1>
        <p>Kelompok Final Project</p>
      </div>
      
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="member-photo">
              <img 
                src={member.photo} 
                alt={member.name} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="nim">{member.nim}</p>
              <p className="role">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;