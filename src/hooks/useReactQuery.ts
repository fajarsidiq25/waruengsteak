import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { apiURL } from '../config/app';
import { authorization } from '../helpers/auth';

type APIResponse<T> = {
  data: T;
};

type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const createApi = () => {
  const instance = axios.create({
    baseURL: apiURL,
    headers: { "Content-Type": "application/json" }
  });

  const fetchData = async <T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
    method: APIMethod = 'GET'
  ) => {
    try {
      const response = await instance.request<APIResponse<T>>({
        url: endpoint,
        method,
        params,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const postData = async <T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
    method: APIMethod = 'POST'
  ) => {
    try {
      const response = await instance.request<APIResponse<T>>({
        url: endpoint,
        method,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const putData = async <T>(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
    method: APIMethod = 'PUT'
  ) => {
    try {
      const response = await instance.request<APIResponse<T>>({
        url: endpoint,
        method,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteData = async <T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
    method: APIMethod = 'DELETE'
  ) => {
    try {
      const response = await instance.request<APIResponse<T>>({
        url: endpoint,
        method,
        params,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchData,
    postData,
    putData,
    deleteData,
  };
};

export const useReactQuery = () => {
  const api = createApi();
  const queryClient = useQueryClient();

  const useGet = <T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => {
    authorization(config)
    return useQuery<any, Error>([endpoint, params], () =>
      api.fetchData<T>(endpoint, params, config)
    );
  };

  const usePost = <T>(
    endpoint: string,
    method: APIMethod = 'POST',
    config?: AxiosRequestConfig
  ) => {
    authorization(config)
    return useMutation<APIResponse<T>, Error, any>((data) =>
      api.postData<T>(endpoint, data, config, method)
    );
  };

  const usePut = <T>(
    endpoint: string,
    method: APIMethod = 'PUT',
    config?: AxiosRequestConfig
  ) => {
    authorization(config)
    return useMutation<APIResponse<T>, Error, any>((data) =>
      api.putData<T>(endpoint, data, config, method)
    );
  };

  const useDelete = <T>(
    endpoint: string,
    params?: Record<string, any>,
    method: APIMethod = 'DELETE',
    config?: AxiosRequestConfig
  ) => {
    authorization(config)
    return useMutation<APIResponse<T>, Error, any>(() =>
      api.deleteData<T>(endpoint, params, config, method)
    );
  };

  return {
    useGet,
    usePost,
    usePut,
    useDelete,
    queryClient,
  };
};
