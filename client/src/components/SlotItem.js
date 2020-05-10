import React from 'react';

const SlotItem: React.FunctionalComponent = ({slot:{ index, status, cat, filename, percentage }}) => {
    return (<div className="card card-body mb-3">
               <div className="row">
                  <div className="col-md-9">
                     <h4> FileName: {filename} </h4>
                     <p> status: {status} </p>
                     <p> catergory: {cat} </p>
                     <p> {percentage}% downloaded </p>
                  </div>                  
               </div>
           </div>
    );
}

export default SlotItem;
