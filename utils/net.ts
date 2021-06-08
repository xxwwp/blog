import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import useSWR, { SWRConfiguration } from "swr";

const uri = process.env.NEXT_PUBLIC_ENV_CMS_URL;

const serverApolloClient = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export async function paperProps(query) {
  const data = (await serverApolloClient.query({ query })).data;
  return { props: { d: data } };
}

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENV_CMS_URL,
});

export function useHTTP<D = any, E = any>(
  url: string,
  axiosConfig: AxiosRequestConfig,
  SWRConfig: SWRConfiguration<AxiosResponse<D>, E>
) {
  return useSWR<AxiosResponse<D>, E>(url, (url) => axios({ url, ...axiosConfig }), {
    revalidateOnFocus: false,
    ...SWRConfig,
  });
}
