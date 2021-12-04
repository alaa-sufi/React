import React, { useState, useEffect } from "react";
import { postApi } from "../Functions/ApiFunc";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Base/LoadingSpinner";

export default function AdminBus({ match }) {
//   const history = useHistory();
//   const [row, setRow] = useState(11);
//   const [right, setRight] = useState(2);
//   const [left, setLeft] = useState(2);
//   const [last, setLast] = useState(5);
//   const [total, setTotal] = useState();
//   const [arrBus, setArrBus] = useState([]);
//   const [arrBusBook, setarrBusBook] = useState([[1,2,5,7] , [6 , 8 , 12]]);
//   const [arrBusBookAdminForShow, setarrBusBookAdminForShow] = useState([1 , 2,5 ,7]); //just for show admin book arr
//   const [arrBusBookUserForShow, setarrBusBookUserForShow] = useState([6 ,8 , 12]); //just for show user book arr
  const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(false);
//     setArrBus(GenerateNumBusArr(row, right, left, last ," " , ...arrBusBook ));
//   }, []);
// const pull_data=(n)=>{
//   // let arrBusBook[0]
//   let temp = arrBusBook;
//   temp[0] = n;
//   setarrBusBookAdminForShow(n);
//   setarrBusBookUserForShow(temp[1])
//   console.log("temp" ,temp)
//   setarrBusBook(temp);
// }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("number_of_rows", row);
//     data.append("last_seats", last);
//     data.append("left_seats", left);
//     data.append("right_seats", right);
//     data.append("category_id", match.params.last);
//     data.append("city_id", match.params.id);
//     postApi(`/api/trip`, data).then((response) => {
//       if (response.data) {
//         history.push(
//           `/admin/trip-type/${match.params.last}/city/${match.params.id}`
//         );
//       }
//     });
//   };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
    <h2>admin bus book</h2>
    </>
  );
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
