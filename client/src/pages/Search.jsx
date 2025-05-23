import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Search = () => {

    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    console.log(listings)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/search?${searchQuery}`);
            const data = await res.json();
            if (data.length > 3) {
                setShowMore(true);
            }
            setListings(data);
            setLoading(false);
        }
        fetchListings();
    }, [location.search])

    const handleChange = (e) => {
        const targetId = e.target.id;
        if (targetId === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value, });
        }
        if (targetId === 'all' || targetId === 'rent' || targetId === 'sale') {
            setSidebardata({ ...sidebardata, type: targetId })
        }
        if (targetId === 'parking' || targetId === 'furnished' || targetId === 'offer') {
            setSidebardata({ ...sidebardata, [targetId]: !sidebardata[targetId] })
        }
        if (targetId === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('type', sidebardata.type)
        urlParams.set('parking', sidebardata.parking)
        urlParams.set('furnished', sidebardata.furnished)
        urlParams.set('offer', sidebardata.offer)
        urlParams.set('sort', sidebardata.sort)
        urlParams.set('order', sidebardata.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/search?${searchQuery}`);
        const data = await res.json();
        if (data.length < 4) setShowMore(false);
        setListings([...listings, ...data]);
    }

    return (
        <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex gap-2 items-center flex-wrap md:flex-nowrap">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input
                            type="text"
                            className="p-2 border rounded-lg w-full"
                            id="searchTerm"
                            placeholder="Search..."
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type: </label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sidebardata.type === 'all'} />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={sidebardata.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={sidebardata.type === 'sale'} />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={sidebardata.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities: </label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={sidebardata.parking} />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebardata.furnished} />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap ">
                        <label className="font-semibold">Sort: </label>
                        <select id="sort_order" className="border rounded-lg p-3" onChange={handleChange} >
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className="bg-slate-700 uppercase p-3 text-white rounded-xl hover:opacity-95 disabled:opacity-80"> Search</button>
                </form>
            </div>
            <div className="p-1 flex-1">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5 min-w-full">Listing results</h1>
                <div className="p-3 flex flex-wrap gap-4">
                    {listings.length === 0 && !loading && (
                        <p className="text-xl to-slate-700">No listing found!</p>
                    )}
                    {loading && (
                        <p className="text-xl to-slate-700 text-center w-full">Loading...</p>
                    )}
                    {!loading && listings && listings.map((list) => (
                        <ListingCard key={list._id} listing={list} />
                    ))}
                    {showMore && (
                        <button onClick={onShowMoreClick} className="text-green-700 hover:underline p-7 text-center w-full">Show more</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
