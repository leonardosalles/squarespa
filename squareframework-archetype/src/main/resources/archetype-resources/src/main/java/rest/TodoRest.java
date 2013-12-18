package ${package}.rest;

import java.lang.reflect.Field;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import ${package}.model.Todo;

import org.apache.commons.lang.StringUtils;
import org.jboss.resteasy.spi.HttpResponse;

@Path("/todo")
@Produces(MediaType.APPLICATION_JSON)
public class TodoRest {

	private static Map<Long, Todo> TODO_MAP = new HashMap<Long, Todo>();
	
	@Context
	public HttpResponse response;
	
	@GET
	public List<Todo> listar(@QueryParam("limit") final Integer limit, 
							 @QueryParam("page") final Integer page, 
							 @QueryParam("sorting") final String[] sorting,
							 @QueryParam("titulo") final String titulo){
		
		
		ArrayList<Todo> filtered = new ArrayList<Todo>();
		
		for(Todo todo : TODO_MAP.values()){			
			if(StringUtils.isNotEmpty(titulo) && !StringUtils.startsWithIgnoreCase(todo.getTitulo(), titulo)){
				continue;
			}		
			filtered.add(todo);
		}
		
		
		Collections.sort(filtered, new Comparator<Todo>() {
			
			@SuppressWarnings({ "unchecked", "rawtypes" })
			@Override
			public int compare(Todo o1, Todo o2) {
				try{
					for(String value : (sorting != null ? sorting  : new String[0])){
						
						String campo = value.substring(1);
						String tipo = value.substring(0, 1);
						
						Field field =  campo.equals("id") ? o1.getClass().getSuperclass().getDeclaredField(campo) : o1.getClass().getDeclaredField(campo);
						field.setAccessible(true);
						
						
						Object v1 = field.get(o1);
						Object v2 = field.get(o2);
						
						if(v1 == null && v2 == null){
							return 0;
						}
						
						int retorno = 0;
						if(v1 != null && v1 instanceof Comparable){
							retorno = ((Comparable) v1).compareTo(v2);
						}else if(v2 != null && v2 instanceof Comparable){
							retorno = ((Comparable) v2).compareTo(v1);
						}
						
						if(retorno != 0){
							return tipo.equals("-") ? retorno * -1 : retorno;
						}
					}
				
				}catch(Exception e ){
					e.printStackTrace();
				}
				
				return 0;
			}
			
		});
		
		if(limit != null){
			int fromIndex = page != null ? limit * (page - 1) : 0; 			
			int toIndex = page != null ? limit * page : limit; 
			toIndex = toIndex > filtered.size() ? filtered.size() : toIndex;
			
			final int pages = filtered.size() / limit;
			
			this.response.getOutputHeaders().putSingle("x-square-meta-total-count", filtered.size());
			this.response.getOutputHeaders().putSingle("x-square-meta-total-pages", filtered.size() % limit == 0 ? pages : pages+1);		
			this.response.getOutputHeaders().putSingle("x-square-meta-current-limit", limit);
			this.response.getOutputHeaders().putSingle("x-square-meta-current-page", page);
			return filtered.subList(fromIndex, toIndex);	
		}
		
		return filtered;
	}

	
	@GET
	@Path("/{id}")
	public Todo buscar(@PathParam("id") Long id) {
		Todo value = TODO_MAP.get(id);
		if(value == null){
			throw new WebApplicationException(HttpURLConnection.HTTP_NOT_FOUND);
		}
		
		return value;
	}

	@POST
	public Todo salvar(Todo entity) {
		entity.setId((long) (Math.random() * 9999999));
		TODO_MAP.put(entity.getId(), entity);
		return entity;
	}

	@POST
	@Path("/{id}")
	public Todo alterar(Todo entity) {
		TODO_MAP.put(entity.getId(), entity);
		return entity;
	}
	
	@DELETE
	@Path("/{id}")
	public void deletar(@PathParam("id") Long id) {
		Todo value = TODO_MAP.remove(id);
		if(value == null){
			throw new WebApplicationException(HttpURLConnection.HTTP_NOT_FOUND);
		}
	}
	
}