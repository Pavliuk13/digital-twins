# Digital Twins
A diploma work for Kyiv Politechnic Institute

# Backend
Requirements: **.NET 6 SDK**

Commands for migrations using CLI:
1. Create migration:
```
dotnet ef migrations add {MigrationName} --project DigitalTwins.DAL --startup-project DigitalTwins.API
```
2. Update database:
```
dotnet ef database update --project DigitalTwins.DAL --startup-project DigitalTwins.API
```
 # Database
 RDBMS: **Microsoft SQL Server**
 
 Connection string for local database:
  ```
   "ConnectionStrings": {
    "DigitalTwinDBConnection": "Server=(localdb)\\MSSQLLocalDB;Database=DigitalTwinDB;Trusted_Connection=True;"
  }
```
## Authors

- [Vasyl Pavliuk](https://github.com/Pavliuk13)
- [Vitalii Kovalov](https://github.com/KovalovV)

