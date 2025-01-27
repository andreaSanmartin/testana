using Microsoft.OpenApi.Models;
using TestNau.BLL;
using TestNau.DAL;
using TestNau.DAL.DBContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Dapper connection configuration
builder.Services.AddScoped<IDbContext, MyDbContext>();

// Repositories
builder.Services.AddScoped<ClientRepository>();
builder.Services.AddScoped<DetailOrderRepository>();
builder.Services.AddScoped<HeaderOrderRepository>();
builder.Services.AddScoped<ItemDetailRepository>();
builder.Services.AddScoped<ItemRepository>();
builder.Services.AddScoped<StatusRepository>();

// Services
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<DetailOrderService>();
builder.Services.AddScoped<HeaderOrderService>();
builder.Services.AddScoped<ItemDetailService>();
builder.Services.AddScoped<ItemService>();
builder.Services.AddScoped<StatusService>();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
    });
});


// Swagger Configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Testanau.Api", Version = "v1" });
});

var app = builder.Build();

// Application pipeline configuration
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TestNau.Api v1"));
}

app.UseRouting();

// Apply CORS policy
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
