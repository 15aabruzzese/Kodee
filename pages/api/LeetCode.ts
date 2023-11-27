import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define a type for the response data structure
interface LeetCodeResponse {
  data: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: Array<{
          difficulty: string;
          count: number;
          submissions: number;
        }>;
      };
    };
  };
}

// Define a type for the response sent back to the client
interface ApiResponse {
  totalSolved?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const graphqlQuery = {
    query: `
      {
        matchedUser(username: "15aabruzzese") {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `,
  };

  try {
    const response = await axios.post<LeetCodeResponse>('https://leetcode.com/graphql', graphqlQuery);

    const totalSolved = response.data.data.matchedUser.submitStats.acSubmissionNum
      .reduce((total, item) => total + item.count, 0);

    res.status(200).json({ totalSolved });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from LeetCode.' });
  }
}
