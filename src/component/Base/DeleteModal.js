import React from 'react'
import {deleteApi } from "../Functions/ApiFunc"
import { useHistory} from "react-router-dom";

export default function DeleteModal(props) {
  const history = useHistory();
 
    const deleteModal = () =>{
      deleteApi(props.url).then(response =>{
        props.back && history.push(props.back);
        props.func && props.func()

        })
    }
    return (

        <div className="modal fade" id="delete" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-body fw-bold text-center">
              هل أنت متأكد من حذف {props.name} </h4>
            </div>
           
            <div className="modal-footer">
              <button type="button" className="btn h-button d-block mx-auto "  data-bs-dismiss="modal" onClick={()=>{deleteModal()}}>تأكيد</button>
              <span className="btn h-button d-block mx-auto cancle " data-bs-dismiss="modal" aria-label="Close">إلغاء</span>
            </div>
          </div>
        </div>
      </div>

      
    )
}
