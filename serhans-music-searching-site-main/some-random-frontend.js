<% if (products.length < perPage) { %>
    <% if (pages > 0) { %>
        <ul>
            <% if (current == 1) { %>
                <li class="disabled"><a>first</a></li>
            <% } else { %>
                <li><a href="/products/1">first</a></li>
            <% } %>

            <% let i = (Number(current) > 5 ? Number(current) - 4 : 1) %>
            <% if (i !== 1) { %>
                <li class="disabled"><a>...</a></li>
            <% } %>
            
            <% for (; i <= (Number(current) + 4) && i <= pages; i++) { %>
                <% if (i == current) { %>
                    <li class="active"><a><%= i %></a></li>
                    
                <% } else { %>
                    <li><a href="/products/<%= i %>"><%= i %></a></li>
                    
                <% } %>
                <% if (i == Number(current) + 4 && i < pages) { %>
                    <li class="disabled"><a>...</a></li>
                    
                <% } %>
            <% } %>

            <% if (current == pages) { %>
                <li class="disabled"><a>last</a></li>
                
            <% } else { %>
                <li><a href="/products/<%= pages %>">last</a></li>
            <% } %>
        </ul>
    <% } %>
<% }