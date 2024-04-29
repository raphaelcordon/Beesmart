const InsightOverallStats = ({ campaign }) => {
    return (
        <div className="flex items-center justify-center min-h-24">
            <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                {campaign.collector_type === 1 ? (
                    <div>
                        <div className="stat-title">Participants</div>
                        <div className="stat-value text-primary">{campaign.participants}</div>
                        <div className="stat-title pt-5">Stamps Collected</div>
                        <div className="stat-value text-secondary">
                            {campaign.value ? campaign.value : <div>0</div>}
                        </div>
                        <div className="stat-title pt-5">Vouchers issued</div>
                        <div className="stat-value">{campaign.vouchers_issued}</div>
                    </div>
                ) : campaign.collector_type === 2 ? (
                    <div>
                        <div className="stat-title">Participants</div>
                        <div className="stat-value text-primary">{campaign.participants}</div>
                        <div className="stat-title pt-5">Points Collected</div>
                        <div className="stat-value text-secondary">
                            {campaign.value ? campaign.value : <div>0</div>}
                        </div>
                        <div className="stat-title pt-5">Vouchers issued</div>
                        <div className="stat-value">{campaign.vouchers_issued}</div>
                    </div>
                ) : (
                    <div>
                        <div className="stat-title">Participants</div>
                        <div className="stat-value text-primary">{campaign.participants}</div>
                        <div className="stat-title pt-5">Money Spent</div>
                        <div className="stat-value text-secondary">
                            {campaign.value ? campaign.value : <div>0</div>}
                        </div>
                        <div className="stat-title pt-5">Vouchers issued</div>
                        <div className="stat-value">{campaign.vouchers_issued}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsightOverallStats;