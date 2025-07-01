'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Customers() {
  const [collapsed, setCollapsed] = useState(false);

  const customerData = [
    { id: "image1", link: "https://taqtikhealth.com/health-news/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/1.png", marginTop: "-22.5px" },
    { id: "image2", link: "https://www.1075jamz.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/3.png", marginTop: "-9.5px" },
    { id: "image3", link: "http://kwaygospel.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/5.png", marginTop: "-54px" },
    { id: "image4", link: "https://www.depinna.com/notarisation-London-Notary", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/7.png", marginTop: "-25.5px" },
    { id: "image5", link: "https://pmgco.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/8.png", marginTop: "-31px" },
    { id: "image6", link: "https://www.biz2biztravel.com/blog/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/biz.png", marginTop: "-24px" },
    { id: "image7", link: "https://core3.m4k.co/m/15903/p/191508", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/11.png", marginTop: "-8px" },
    { id: "image8", link: "https://gtmme.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/12.png", marginTop: "-32px" },
    { id: "image9", link: "https://realfoodseminars.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/13.png", marginTop: "-72px" },
    { id: "image10", link: "https://amazingribs.com/news", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/16.png", marginTop: "-14px" },
    { id: "image11", link: "http://www.cwnsports.com/index.html", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/cwn.png", marginTop: "-20.5px" },
    { id: "image12", link: "https://onthegotransit.com/news/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/18.png", marginTop: "-51.5px" },
    { id: "image13", link: "https://socialmedia.rocks/our-blog/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/19.png", marginTop: "-25.5px" },
    { id: "image14", link: "http://1017thetorch.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/20.png", marginTop: "-70px" },
    { id: "image15", link: "https://kscopetradio.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/21.png", marginTop: "-70px" },
    { id: "image16", link: "https://preferredmagazine.ca/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/22.png", marginTop: "-27.5px" },
    { id: "image17", link: "https://gerlancarparts.ie/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/23.png", marginTop: "-69.5px" },
    { id: "image18", link: "https://www.malaysianmirror.asia/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/24.png", marginTop: "-15px" },
    { id: "image19", link: "https://www.z95thebone.net/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/25.png", marginTop: "-35px" },
    { id: "image20", link: "http://smithtreespecialists.com/", image: "https://cdn.feedspot.com//widgets/Assets/images/customers/26.png", marginTop: "-39px" },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar collapsed={collapsed} />
        <div className={`max-w-7xl mx-auto px-20 py-16 text-center ${collapsed ? 'ml-16' : 'ml-64'}`}>
           
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Join 1000+ amazing brands who have added Feedspot Widgets on their websites
          </h1>
          <p className="text-xl text-gray-600 mb-12">Our Customers</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
            {customerData.map(({ link, image, marginTop, id }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="nofollow"
                className="hover:scale-105 transition-transform"
              >
                <img
                  src={image}
                  id={id}
                  alt={`Customer ${id}`}
                  style={{ marginTop }}
                  className="max-h-20 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
