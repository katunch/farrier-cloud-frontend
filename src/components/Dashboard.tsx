import React from 'react';
import { GitCommit, GitPullRequest, GitMerge, Star } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <GitCommit className="w-5 h-5" />,
            title: "Commits",
            value: "2,431",
            change: "+23%",
            positive: true
          },
          {
            icon: <GitPullRequest className="w-5 h-5" />,
            title: "Pull Requests",
            value: "132",
            change: "+12%",
            positive: true
          },
          {
            icon: <GitMerge className="w-5 h-5" />,
            title: "Merged PRs",
            value: "84",
            change: "-5%",
            positive: false
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-[#161b22] rounded-lg p-6 border border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-800 rounded-lg text-blue-400">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <div className="flex items-center space-x-3">
                  <p className="text-2xl font-semibold text-gray-100">
                    {stat.value}
                  </p>
                  <span className={`text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161b22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                title: "Updated README.md",
                repo: "main/project",
                time: "2h ago"
              },
              {
                title: "Merged PR #234: Fix navigation bug",
                repo: "feature/nav-fix",
                time: "5h ago"
              },
              {
                title: "Created new branch",
                repo: "feature/auth",
                time: "8h ago"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-gray-300">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.repo}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161b22] rounded-lg p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Top Repositories</h2>
          <div className="space-y-4">
            {[
              {
                name: "react-dashboard",
                stars: "1.2k",
                language: "TypeScript"
              },
              {
                name: "api-service",
                stars: "892",
                language: "Go"
              },
              {
                name: "mobile-app",
                stars: "645",
                language: "Swift"
              }
            ].map((repo, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-gray-300">{repo.name}</p>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-gray-500">{repo.language}</span>
                    <div className="flex items-center text-gray-500">
                      <Star size={14} className="mr-1" />
                      {repo.stars}
                    </div>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;