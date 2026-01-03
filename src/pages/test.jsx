import { useRef, useEffect, useState } from "react";

const Test = () => {
    const renderCount = useState(0);

    useEffect(() => {
        renderCount.current += 1;
    });

    return <h1>Renders: {renderCount.current}</h1>;
}
export default Test;