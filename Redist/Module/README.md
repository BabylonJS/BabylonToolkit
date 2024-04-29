First, create a new class for the HttpModule:

```csharp
using System;
using System.IO;
using System.Web;

namespace Mackey
{
    public class GZipHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.BeginRequest += new EventHandler(this.Context_BeginRequest);
        }

        private void Context_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            string filePath = context.Request.FilePath;
            string fileName = Path.GetFileName(filePath);

            if (fileName.IndexOf(".gz.gltf", StringComparison.OrdinalIgnoreCase) >= 0 || fileName.IndexOf(".gz.glb", StringComparison.OrdinalIgnoreCase) >= 0 || fileName.IndexOf(".gz.bin", StringComparison.OrdinalIgnoreCase) >= 0)
            {
                context.Response.Headers.Add("Content-Encoding", "gzip");
            }
        }

        public void Dispose() { }
    }
}
```

Then, register this HttpModule in your web.config:

```xml
<configuration>
  <system.webServer>
    <modules>
      <add name="GZipHttpModule" type="Mackey.GZipHttpModule, GZipHttpModule.dll"/>
    </modules>
  </system.webServer>
</configuration>
```

This module will add the gzip response header to any file served if the requested file name has .gz.gltf, .gz.glb, or .gz.bin in it.