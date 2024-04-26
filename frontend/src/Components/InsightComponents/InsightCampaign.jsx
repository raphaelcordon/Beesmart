import {useEffect, useRef, useState} from "react";
import Chart from 'chart.js/auto';

import defaultlogo from "../../assets/defaultlogo.png";

import { Link } from "react-router-dom";
import BarChart from "./Graphics/BarChart.jsx";
import {getAllOpenCampaigns} from "../../axios/axiosCampaign.js";
import {getInsightStamps, getInsightVisits} from "../../axios/axiosInsights.js";

const InsightCampaign = ({ campaign }) => {
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const [insightStamps, setInsightStamps] = useState([])
      const [insightVisits, setInsightVisits] = useState([])

      useEffect(() => {
          const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            try {
              const data = await getInsightStamps(campaign?.id);
              setInsightStamps(data);
            } catch (error) {
              setError(error.message || "Failed to load insights. Please try again.");
            }

            try {
              const data = await getInsightVisits(campaign?.id);
              setInsightVisits(data);
            } catch (error) {
              setError(error.message || "Failed to load insights. Please try again.");
            } finally {
              setIsLoading(false);
            }
          };
          fetchData();
          }, []);


  return (
      <>
            <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                  <h1 className="text-xl text-slate-600 font-semibold text-center mt-2 mb-6">Acquired Stamps - Per
                        User</h1>
                  <BarChart insight={insightStamps}/>
            </div>

            <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                  <h1 className="text-xl text-slate-600 font-semibold text-center mt-2 mb-6">Accesses by period</h1>
                  <BarChart insight={insightVisits}/>
            </div>
      </>
  );
};

export default InsightCampaign;