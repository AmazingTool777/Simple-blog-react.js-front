import { useEffect, useCallback } from "react";

// Custom hook for running side effects on end of scroll
function useScrollEndObserver(effect) {
	const checkEndOfScroll = useCallback(() => window.innerHeight + window.scrollY >= document.body.offsetHeight, []);

	useEffect(() => {
		const observation = () => {
			if (checkEndOfScroll()) effect();
		};
		window.addEventListener("scroll", observation);
		return () => window.removeEventListener("scroll", observation);
	}, [effect, checkEndOfScroll]);

	return { checkEndOfScroll };
}

export default useScrollEndObserver;
