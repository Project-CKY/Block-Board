import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import LoadingSpinner from "./UI/LoadingSpinner";

const TxDetails = () => {
    const [transactionDetails, setTransactionDetails] = useState(null);

    const params = useParams();
    const { transactionId } = params;

    // console.log(transactionId);

    const getTransctionById = async () => {
        const response = await fetch(`https://ubiquity.api.blockdaemon.com/v1/ethereum/mainnet/tx/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_UBIQUITY_KEY}`
          }
        });
  
        const data = await response.json();
        setTransactionDetails(data);
        // console.log(data);
    }

    useEffect(() => {
        getTransctionById();
    }, []);

    if(transactionDetails == null) {
        return (
            <div className="text-center mt-5">
                <LoadingSpinner />
                <h3 className="text-center text-white mt-3">Loading...</h3>
            </div>
        )
    }

    return (
        <main className="extra-dark pb-5">
            <div className="search-holder pt-4 pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-white"><span className="text-primary font-weight-bold mr-5">Txn Hash: </span>{transactionDetails != null ? transactionDetails.id : "loading..."}</p>
                            <p className="text-white"><span className="text-primary font-weight-bold mr-5">Block: </span>{transactionDetails != null ? transactionDetails.block_number : "loading..."}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card bg-dark-gray">
                            <div className="card-body">
                                <h5 className="text-danger mb-5">Transaction Details</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card custom-tr text-white mb-2">
                                            <div className="card-body">
                                                <div className="micro-text table-responsive">
                                                    <p>Transaction Hash: {transactionDetails.id}</p>
                                                    <p>Status: <span className="text-success">{transactionDetails.status}</span></p>
                                                    <p>Timestamp: {transactionDetails.date}</p>
                                                    <p>Confirmations: {transactionDetails.confirmations}</p>
                                                    <h5>Events ({transactionDetails.num_events}):</h5>
                                                    <div className="row">
                                                        {transactionDetails.events.length > 0 && transactionDetails.events.map((event) => (
                                                            <div className="col-md-12 mb-3" key={event.id}>
                                                                <div className="card bg-dark-gray">
                                                                    <div className="card-body">
                                                                        <p className="font-weight-bold">Transaction Type: {event.type}</p>
                                                                        <hr className="border-white" />
                                                                        <p>Amount: {event.amount}</p>
                                                                        <p>Decimals: {event.denomination}</p>
                                                                        <p>From: {event.source}</p>
                                                                        {event.type === "transfer" &&
                                                                            <p>To: {event.destination}</p>
                                                                        }

                                                                        {event.type === "fee" &&
                                                                            <div>
                                                                                <h6 className="font-weight-bold">Meta data</h6>
                                                                                <p>Base fee: {event.meta.base_fee}</p>
                                                                                <p>Fee burned: {event.meta.fee_burned}</p>
                                                                                <p>Gas limit: {event.meta.gas_limit}</p>
                                                                                <p>Gas price: {event.meta.gas_price}</p>
                                                                                <p>Gas used: {event.meta.gas_used}</p>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TxDetails;