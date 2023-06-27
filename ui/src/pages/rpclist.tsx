import React, { useState, useEffect } from 'react';

function UrlResponseTimeChecker() {

    const urls: string[] = [
        "https://sui-rpc-mainnet.testnet-pride.com/",
        "https://sui-mainnet.nodeinfra.com/",
        "https://mainnet-rpc.sui.chainbase.online/",
        "https://sui-mainnet-ca-1.cosmostation.io/",
        "https://sui-mainnet-ca-2.cosmostation.io/",
        "https://sui-mainnet-eu-1.cosmostation.io/",
        "https://sui-mainnet-eu-2.cosmostation.io/",
        "https://sui-mainnet-eu-3.cosmostation.io/",
        "https://sui-mainnet-eu-4.cosmostation.io/",
        "https://sui-mainnet-us-1.cosmostation.io/",
        "https://sui-mainnet-us-2.cosmostation.io/",
        "https://mainnet.sui.rpcpool.com/",
        "https://sui-mainnet-endpoint.blockvision.org/",
        "https://rpc-mainnet.suiscan.xyz:443",
        "https://sui.publicnode.com",
        "https://sui-mainnet.blockeden.xyz/",
        "https://sui-mainnet-rpc.allthatnode.com/",
        "https://sui-mainnet-rpc-germany.allthatnode.com/",
        "https://sui-mainnet-rpc-korea.allthatnode.com/",
        "https://sui-mainnet-rpc.bartestnet.com/",
        "https://sui1mainnet-rpc.chainode.tech/",
        "https://sui-rpc-mainnet.brightlystake.com/",
        "https://rpc-testnet.suiscan.xyz:443",
    ];

    const [responseTimes, setResponseTimes] = useState<{ [url: string]: number }>({});
    useEffect(() => {
        const intervalId = setInterval(() => {
            urls.forEach(async (url) => {
                try {
                    const startTime = new Date().getTime();
                    await fetch(url);
                    const endTime = new Date().getTime();
                    const timeDiff = endTime - startTime;
                    setResponseTimes((prevResponseTimes) => ({
                        ...prevResponseTimes,
                        [url]: timeDiff,
                    }));
                } catch (error) {
                    setResponseTimes((prevResponseTimes) => ({
                        ...prevResponseTimes,
                        [url]: 0,
                    }));
                }

            });
        }, 5000); // 间隔时间为5秒钟

        return () => clearInterval(intervalId);
    }, [urls]);

    return (
        <div>
            <h2 className="text-2xl">Mainnet rpc node List: </h2>
            <div className="mt-3">
                {urls.map((url) => (
                    <div key={url}>
                        <p>
                            <b className="w-1/2 inline-block">{url}</b>
                            {responseTimes[url] && <span className="whitespace-nowrap text-green-500">Response Time: {responseTimes[url]} ms</span>}
                        </p>
                    </div>
                ))
                }
            </div>
        </div >
    );
}

export default UrlResponseTimeChecker;
