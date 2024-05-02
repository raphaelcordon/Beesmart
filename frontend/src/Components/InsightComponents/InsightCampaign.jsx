import {useEffect, useState} from "react";
import BarChart from "./Graphics/BarChart.jsx";
import {getInsightPoints, getInsightStamps, getInsightVisits, getInsightVouchers} from "../../axios/axiosInsights.js";
import InsightOverallStats from "./InsightOverallStats.jsx";

const InsightCampaign = ({campaign}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [insightPoints, setInsightPoints] = useState([])
    const [insightStamps, setInsightStamps] = useState([])
    const [insightVisits, setInsightVisits] = useState([])
    const [insightVouchers, setInsightVouchers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setError(null);
            setIsLoading(true);

            try {
                const data = await getInsightPoints(campaign?.id);
                setInsightPoints(data);
            } catch (error) {
                setError(error.message || "Failed to load insights. Please try again.");
            }

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
            }

            try {
                const data = await getInsightVouchers(campaign?.id);
                setInsightVouchers(data);
            } catch (error) {
                setError(error.message || "Failed to load insights. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    let barChartProps = {};
    if (campaign.collector_type === 1) {
        barChartProps = { insight: insightStamps, type: 'Stamps' };
    } else if (campaign.collector_type === 2) {
        barChartProps = { insight: insightPoints, type: 'Points' };
    } else if (campaign.collector_type === 3) {
        barChartProps = { insight: insightPoints, type: 'Money' };  // Not sure if this should also be insightPoints
    }

    return (
        <>
            <div className="lg:flex lg:justify-center lg:gap-4">
                <div
                    className="max-w-md lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl w-full bg-base-100 rounded-lg shadow-lg lg:pb-2">
                    <h1 className="text-xl lg:text-2xl text-slate-600 font-semibold text-center mt-2 mb-6">Current stats</h1>
                    <InsightOverallStats campaign={campaign}/>
                </div>

                <div
                    className="max-w-md lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl w-full bg-base-100 rounded-lg shadow-lg lg:pb-2">
                    <h1 className="text-xl lg:text-2xl text-slate-600 font-semibold text-center mt-2 mb-6">Accesses by
                        period</h1>
                    <BarChart insight={insightVisits} type={'AccessesByPeriod'}/>
                </div>
            </div>
            <div className="lg:flex lg:justify-center lg:gap-4 lg:pt-4">
                <div
                    className="max-w-md lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl w-full bg-base-100 rounded-lg shadow-lg lg:pb-2">
                    <h1 className="text-xl lg:text-2xl text-slate-600 font-semibold text-center mt-2 mb-6">
                        {campaign.collector_type === 1 ? "Users with ongoing STAMPS" :
                            campaign.collector_type === 2 ? "Users with ongoing POINTS" :
                                campaign.collector_type === 3 ? "Users with ongoing campaigns by MONEY SPENT" : "Unknown Type"}
                    </h1>
                    <BarChart {...barChartProps} />
                </div>

                <div
                    className="max-w-md lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl w-full bg-base-100 rounded-lg shadow-lg lg:pb-2">
                    <h1 className="text-xl lg:text-2xl text-slate-600 font-semibold text-center mt-2 mb-6">Vouchers issued</h1>
                     <BarChart insight={insightVouchers} type={'Voucher'}/>
                </div>
            </div>

        </>
    );
};

export default InsightCampaign;

// <div
//     className="max-w-md lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl w-full bg-base-100 rounded-lg shadow-lg lg:pb-2">
//     <h1 className="text-xl lg:text-2xl text-slate-600 font-semibold text-center mt-2 mb-6">Acquired Stamps
//         - Per User</h1>
//     <BarChart insight={insightStamps}/>
// </div>