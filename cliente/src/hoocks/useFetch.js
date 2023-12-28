import { useCallback, useEffect, useReducer, useState } from "react";
import { API } from "../api";
import { fechReducer, initialState } from "../reducers/fecht";
import { FETCH_DATA } from "./../action/Fetch";

export const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(fechReducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get(endpoint);
      dispatch({ type: FETCH_DATA.SET_DATA, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: FETCH_DATA.SET_ERROR });
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};
