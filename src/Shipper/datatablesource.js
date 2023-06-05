  export const PriceColumns = [
    {
      field: "id",
      headerName: "ID",
      width:30,
    },
    {
      field: "logistic.name",
      headerName: "Name",
      width: 410,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.logistic.logo_url} alt="avatar" style={{width: 70}}/>
            {params.row.logistic.company_name}
          </div>
        );
      },
    },
    {
      field: "min_day",
      headerName: "Estimated",
      width: 120,
      renderCell: (params) => {
        const estimatedDays = `${params.row.min_day} - ${params.row.max_day}`;
        return (
          <div className="cellWithImg">
            {estimatedDays} Days
          </div>
        );
      },      
    },
    {
      field: "total_price",
      headerName: "Cost",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(params.row.total_price)}
          </div>
        );
      },
    },
  ];
