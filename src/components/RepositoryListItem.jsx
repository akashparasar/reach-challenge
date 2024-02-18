import React, { useState } from 'react';
import TotalChangesChart from "./TotalChangesChart";
import ContributorChart from "./ContributorChart";
import { timeAgoFormatter } from "../utils/timeAgoFormat";

const RepositoryListItem = ({ repository }) => {
    const [activityType, setActivityType] = useState('commit');
    const [isShow, setIshow] = useState(false);

    const showGraph = () => {
        setIshow(!isShow)
    }

    const handleActivity = (e) => {
        setActivityType(e.target.value)
    }

    return (
        <div className={`m-6 bg-white shadow-md rounded-md overflow-hidden border ${isShow ? 'border-slate-300' : 'border-slate-200'}`}>
            <div className="p-6">
                <div className="flex flex-col md:flex-row items-center">
                    {repository?.owner?.avatar_url ?
                        <img src={repository.owner.avatar_url} className='w-24 h-24 rounded-full object-cover md:mr-4' alt="not found" />
                        :
                        <div className="h-24 w-24 rounded-full md:mr-4 bg-slate-500 flex justify-center items-center font-semibold text-2xl text-white">
                            A
                        </div>
                    }
                    <div className="md:ml-4">
                        <h2 className="text-lg font-semibold text-gray-800">{repository?.name}</h2>
                        <p className="text-gray-600">{repository?.description}</p>
                        <div className="mt-2 flex items-center">
                            <div className="flex items-center mr-6">
                                <svg className="h-5 w-5 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 14.2l-4.6 2.7 1.1-5.3-3.7-3.7 5.4-0.4 2.3-5 2.3 5 5.4 0.4-3.7 3.7 1.1 5.3z"></path>
                                </svg>
                                <span className="text-gray-600">{repository?.stargazers_count} stars</span>
                            </div>
                            <div className="flex items-center mr-6">
                                <svg className="h-5 w-5 fill-current text-red-500 mr-1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM10 18c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
                                </svg>
                                <span className="text-gray-600">{repository?.open_issues_count} issues</span>
                            </div>
                            <div className="text-gray-600">Last updated {timeAgoFormatter(repository?.pushed_at)}</div>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <button onClick={showGraph}>
                            <svg className={`h-6 w-6 fill-current text-gray-600 ${isShow ? '' : 'rotate-180'} `} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4 9h12z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isShow &&
                <div className="border-t p-6">
                    <div className="mb-2 flex justify-end">
                        <select
                            className="block border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={activityType}
                            onChange={handleActivity}
                        >
                            <option value={'commit'}>Commit</option>
                            <option value={'addition'}>Addition</option>
                            <option value={'deletion'}>Deletion</option>
                        </select>
                    </div>

                    <div>
                        <div className="mb-4">
                            <TotalChangesChart repository={repository} activityType={activityType} />
                        </div>
                        <div>
                            <ContributorChart repository={repository} activityType={activityType} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RepositoryListItem;