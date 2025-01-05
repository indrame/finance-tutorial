import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { convertAmountFromMiliunits } from '@/lib/utils';
import { useSearchParam } from 'react-use';

export const useGetTransactions = () => {
    const from = useSearchParam("from") || "";
    const to = useSearchParam("to") || "";
    const accountId = useSearchParam("accountId") || "";

    const query = useQuery({
        queryKey: ["transactions", {from, to, accountId}],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: {
                    from,
                    to,
                    accountId,
                }
            });
            
            if(!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const { data } = await response.json();
            return data.map((transaction) => ({
                ...transaction,
                amount: convertAmountFromMiliunits(transaction.amount)
            }))
        }
    })
    return query;
}