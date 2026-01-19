const Pagination = ({ page, setPage, totalPages }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-6 gap-2">
            <button
                className="btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Prev
            </button>

            {[...Array(totalPages).keys()].map(p => (
                <button
                    key={p}
                    onClick={() => setPage(p + 1)}
                    className={`btn btn-sm ${page === p + 1 ? "btn-primary" : ""
                        }`}
                >
                    {p + 1}
                </button>
            ))}

            <button
                className="btn btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
