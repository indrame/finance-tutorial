import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { convertAmountFromMiliunits } from '@/lib/utils';
import { useSearchParam } from 'react-use';

export const useGetSummary = () => {
    const from = useSearchParam("from") || "";
    const to = useSearchParam("to") || "";
    const accountId = useSearchParam("accountId") || "";

    const query = useQuery({
        queryKey: ["summary", {from, to, accountId}],
        queryFn: async () => {
            const response = await client.api.summary.$get({
                query: {
                    from,
                    to,
                    accountId,
                }
            });
            
            if(!response.ok) {
                throw new Error("Failed to fetch summary");
            }

            const { data } = await response.json();
            return {
                ...data,
                income: convertAmountFromMiliunits(data.incomeAmount),
                expenses: convertAmountFromMiliunits(data.expenseAmount),
                remaining: convertAmountFromMiliunits(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertAmountFromMiliunits(category.value)
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertAmountFromMiliunits(day.income),
                    expenses: convertAmountFromMiliunits(day.expenses),
                }))
            }
        }
    })
    return query;
}