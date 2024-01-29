let lower_limit = -1
let upper_limit = 5
function getData(x,y){
    let searching = $('#search-input').val()
    let content = ''
    let buttonNext = '' 
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: encodeURIComponent('artist:'+searching+''), // Mengekodkan query parameter
            type: 'album'
        },
        headers: {
            'Authorization': 'Bearer YOUR_TOKEN' // Ganti dengan token yang valid
        },
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data)
            // Data berhasil diambil
            let albums = data.albums.items;
            $.each(albums,function(i,data){
                console.log(x)

                if (i > x && i < y){

                    if (x == -1 && y == 5){
                        buttonNext =
                        `
                        <div class="row mt-4 mb-4 mx-auto justify-content-center">
                            <button type="button" class="btn btn-success" id="next" style="width: 100px; height: 40px;">Next</button>
                        </div>
                        `
                        
                        
                    } else if (y == 20 && x == 14 ){
                        buttonNext = 
                        `
                        <div class="row mt-4 mb-4 mx-auto justify-content-center">
                            <button type="button" class="btn btn-success" id="previous" style="width: 100px; height: 40px;">Previous</button>
                        </div>
                        `


                    } else {
                        buttonNext = 
                        `
                        <div class="row mt-4 mb-4 mx-auto justify-content-center">
                            <button type="button" class="btn btn-success" id="previous" style="width: 100px; height: 40px;">Previous</button>
                            <span style="margin-right: 15px;"></span> 
                            <button type="button" class="btn btn-success" id="next" style="width: 100px; height: 40px;">Next</button>
                        </div>
                        `
                    }
                    
                    content +=     
                    `    
                    <div class="col-md-3">
                        <div class="card mb-3 text-white bg-success border-success" style="width: 250px; height: 450px;">
                            <!-- Menambahkan inline style untuk menetapkan lebar dan tinggi -->
                            <img src="`+data.images[0].url+`" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+data.name+`</h5>
                                <p class="card-text">`+data.artists[0].name+`</p>
                                <a href="`+data.external_urls.spotify+`" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    `
                }                
            })

            $('#item').html(content)
            $('#con-next').html(buttonNext)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle error dengan lebih rinci
            content += `<h1>gagal</h1>`
            $('#item').html(content)
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

// Menanggapi klik tombol pencarian
$('#search-button').on('click', function() {
    lower_limit = -1
    upper_limit = 5
    getData(lower_limit,upper_limit);
  
});

// Menanggapi tombol "Enter" pada input
$('#search-input').on('keydown', function(event) {
    if (event.which === 13) {
        lower_limit = -1
        upper_limit = 5
        getData(lower_limit,upper_limit);
       
    }
});


//menekan tombol next
$('#con-next').on('click','#next',function(){
    lower_limit += 5
    upper_limit += 5
    getData(lower_limit,upper_limit)    
})


//menekan tombol previous
$('#con-next').on('click','#previous',function(){
    lower_limit -= 5;
    upper_limit -= 5;  
    getData(lower_limit,upper_limit)
})